--
-- PostgreSQL database dump
--

-- Dumped from database version 10.6
-- Dumped by pg_dump version 10.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.skills_vacantes DROP CONSTRAINT skills_vacantes_id_vacante_fkey;
ALTER TABLE ONLY public.skills_vacantes DROP CONSTRAINT skills_vacantes_id_skill_fkey;
ALTER TABLE ONLY public.skills_candidatos DROP CONSTRAINT skills_candidato_id_skill_fkey;
ALTER TABLE ONLY public.skills_candidatos DROP CONSTRAINT skills_candidato_id_candidato_fkey;
ALTER TABLE ONLY public.vacantes DROP CONSTRAINT "ref_vacantes_to_tipo.contrato";
ALTER TABLE ONLY public.vacantes DROP CONSTRAINT "ref_vacantes_to_tiempo.vacantes";
ALTER TABLE ONLY public.vacantes DROP CONSTRAINT ref_vacantes_to_empresa;
ALTER TABLE ONLY public.vacantes DROP CONSTRAINT ref_vacantes_personas_asignado;
ALTER TABLE ONLY public.vacantes DROP CONSTRAINT ref_vacantes_personas;
ALTER TABLE ONLY public.vacantes DROP CONSTRAINT ref_vacantes_estatus;
ALTER TABLE ONLY public.vacantes DROP CONSTRAINT ref_vacantes_empresa;
ALTER TABLE ONLY public.skills DROP CONSTRAINT "ref_skills_to_grupo.skills";
ALTER TABLE ONLY public.candidatos DROP CONSTRAINT ref_candidatos_to_personas;
ALTER TABLE ONLY public.notas_candidato DROP CONSTRAINT notas_candidato_persona_creacion_fkey;
ALTER TABLE ONLY public.notas_candidato DROP CONSTRAINT notas_candidato_id_candidato_fkey;
ALTER TABLE ONLY public.personas DROP CONSTRAINT fk_personas_rol;
ALTER TABLE ONLY public.personas DROP CONSTRAINT fk_personas_empresa;
ALTER TABLE ONLY public.evaluador_vacantes DROP CONSTRAINT fk_evaluador_vacantes_vacantes;
ALTER TABLE ONLY public.evaluador_vacantes DROP CONSTRAINT fk_evaluador_vacantes_personas;
ALTER TABLE ONLY public.evaluador_vacantes DROP CONSTRAINT "fk_evaluador_vacante_persona(reclutador)";
ALTER TABLE ONLY public.evaluaciones DROP CONSTRAINT fk_evaluaciones_vacantes;
ALTER TABLE ONLY public.evaluaciones DROP CONSTRAINT fk_evaluaciones_personas;
ALTER TABLE ONLY public.evaluaciones_candidatos DROP CONSTRAINT fk_ec_skills;
ALTER TABLE ONLY public.evaluaciones_candidatos DROP CONSTRAINT fk_ec_evaluaciones;
ALTER TABLE ONLY public.evaluaciones_candidatos DROP CONSTRAINT fk_ec_candidatos;
ALTER TABLE ONLY public.candidato_vacante DROP CONSTRAINT fk_candidato_vacante_vacantes;
ALTER TABLE ONLY public.candidato_vacante DROP CONSTRAINT fk_candidato_vacante_personas;
ALTER TABLE ONLY public.candidato_vacante DROP CONSTRAINT fk_candidato_vacante_estatus;
ALTER TABLE ONLY public.candidato_vacante DROP CONSTRAINT fk_candidato_vacante_candidatos;
ALTER TABLE ONLY public.vacantes DROP CONSTRAINT vacantes_pkey;
ALTER TABLE ONLY public.tiempo_vacantes DROP CONSTRAINT tipovacantes_pkey;
ALTER TABLE ONLY public.tipo_contratos DROP CONSTRAINT tipocontratos_pkey;
ALTER TABLE ONLY public.skills DROP CONSTRAINT skills_pkey;
ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
ALTER TABLE ONLY public.evaluaciones DROP CONSTRAINT pk_evaluacion_id_evaluacion;
ALTER TABLE ONLY public.personas DROP CONSTRAINT personas_pkey;
ALTER TABLE ONLY public.notas_candidato DROP CONSTRAINT notas_candidato_pkey;
ALTER TABLE ONLY public.grupo_skills DROP CONSTRAINT gruposkills_pkey;
ALTER TABLE ONLY public.empresa DROP CONSTRAINT empresa_pkey;
ALTER TABLE ONLY public.catalogos DROP CONSTRAINT catalogos_pkey;
ALTER TABLE ONLY public.catalogo_estatus DROP CONSTRAINT catalogo_estatus_pkey;
ALTER TABLE ONLY public.candidatos DROP CONSTRAINT candidatos_pkey;
ALTER TABLE public.vacantes ALTER COLUMN id_vacante DROP DEFAULT;
ALTER TABLE public.tipo_contratos ALTER COLUMN id_tipo_contrato DROP DEFAULT;
ALTER TABLE public.tiempo_vacantes ALTER COLUMN id_tiempo_vacante DROP DEFAULT;
ALTER TABLE public.skills ALTER COLUMN id_skill DROP DEFAULT;
ALTER TABLE public.roles ALTER COLUMN id_rol DROP DEFAULT;
ALTER TABLE public.personas ALTER COLUMN id_persona DROP DEFAULT;
ALTER TABLE public.notas_candidato ALTER COLUMN id_nota DROP DEFAULT;
ALTER TABLE public.grupo_skills ALTER COLUMN id_grupo_skill DROP DEFAULT;
ALTER TABLE public.empresa ALTER COLUMN id_empresa DROP DEFAULT;
ALTER TABLE public.catalogos ALTER COLUMN id_catalogo DROP DEFAULT;
ALTER TABLE public.catalogo_estatus ALTER COLUMN id_estatus DROP DEFAULT;
ALTER TABLE public.candidatos ALTER COLUMN id_candidato DROP DEFAULT;
DROP SEQUENCE public.vacantes_idvacante_seq;
DROP TABLE public.vacantes;
DROP SEQUENCE public.tipovacantes_idtipovacante_seq;
DROP SEQUENCE public.tipocontratos_idtipocontrato_seq;
DROP TABLE public.tipo_contratos;
DROP TABLE public.tiempo_vacantes;
DROP TABLE public.skills_vacantes;
DROP SEQUENCE public.skills_idskill_seq;
DROP TABLE public.skills_candidatos;
DROP TABLE public.skills;
DROP SEQUENCE public.roles_id_rol_seq;
DROP TABLE public.roles;
DROP SEQUENCE public.personas_idpersona_seq;
DROP TABLE public.personas;
DROP SEQUENCE public.notas_candidato_id_nota_seq;
DROP TABLE public.notas_candidato;
DROP SEQUENCE public.gruposkills_idgruposkill_seq;
DROP TABLE public.grupo_skills;
DROP TABLE public.evaluador_vacantes;
DROP TABLE public.evaluaciones_candidatos;
DROP TABLE public.evaluaciones;
DROP SEQUENCE public.empresa_idempresa_seq;
DROP TABLE public.empresa;
DROP SEQUENCE public.catalogos_id_catalogo_seq;
DROP TABLE public.catalogos;
DROP SEQUENCE public.catalogo_estatus_id_estatus_seq;
DROP TABLE public.catalogo_estatus;
DROP SEQUENCE public.candidatos_idcandidato_seq;
DROP TABLE public.candidatos;
DROP TABLE public.candidato_vacante;
DROP FUNCTION public.fn_update_skills_vacantes(v_id_vacante integer, v_id_skill integer, v_nivel integer, v_comentarios character varying);
DROP FUNCTION public.fn_update_skills_candidatos(v_id_candidato integer, v_id_skill integer, v_nivel integer, v_comentarios character varying);
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: fn_update_skills_candidatos(integer, integer, integer, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.fn_update_skills_candidatos(v_id_candidato integer, v_id_skill integer, v_nivel integer, v_comentarios character varying DEFAULT NULL::character varying) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    LOOP
        -- first try to update the key
        UPDATE skills_candidatos SET nivel = v_nivel, comentarios = v_comentarios WHERE id_candidato = v_id_candidato AND id_skill = v_id_skill;
        IF found THEN
            RETURN;
        END IF;
        -- not there, so try to insert the key
        -- if someone else inserts the same key concurrently,
        -- we could get a unique-key failure
        BEGIN
            INSERT INTO skills_candidatos(id_candidato, id_skill, nivel, comentarios) VALUES (v_id_candidato, v_id_skill, v_nivel, v_comentarios);
            RETURN;
        EXCEPTION WHEN unique_violation THEN
            -- Do nothing, and loop to try the UPDATE again.
        END;
    END LOOP;
END;
$$;


--
-- Name: fn_update_skills_vacantes(integer, integer, integer, character varying); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.fn_update_skills_vacantes(v_id_vacante integer, v_id_skill integer, v_nivel integer, v_comentarios character varying DEFAULT NULL::character varying) RETURNS void
    LANGUAGE plpgsql
    AS $$BEGIN
    LOOP
        -- first try to update the key
        UPDATE skills_vacantes SET nivel = v_nivel, comentarios = v_comentarios WHERE id_vacante = v_id_vacante and id_skill = v_id_skill;
        IF found THEN
            RETURN;
        END IF;
        -- not there, so try to insert the key
        -- if someone else inserts the same key concurrently,
        -- we could get a unique-key failure
        BEGIN
            INSERT INTO skills_vacantes(id_vacante, id_skill, nivel, comentarios) VALUES (v_id_vacante, v_id_skill, v_nivel, v_comentarios);
            RETURN;
        EXCEPTION WHEN unique_violation THEN
            -- Do nothing, and loop to try the UPDATE again.
        END;
    END LOOP;
END;$$;


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: candidato_vacante; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.candidato_vacante (
    id_candidato integer NOT NULL,
    id_vacante integer NOT NULL,
    id_reclutador integer,
    fecha_asignacion date,
    estatus_candidato_proceso integer
);


--
-- Name: candidatos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.candidatos (
    id_candidato integer NOT NULL,
    id_persona integer,
    pais character varying(25),
    ciudad character varying(30),
    codigo_postal character(5),
    fecha_graduacion date,
    universidad character varying(50),
    curriculum_vitae text,
    cv_digital text,
    foto bytea[],
    skype character varying(25),
    grado_estudios integer,
    grado_ingles integer,
    activo boolean,
    sueldo_actual real,
    prestaciones_actual text,
    expectativa_actual real,
    fecha_actualizacion date,
    id_reclutador_alta integer,
    id_fuente integer,
    oferta text,
    fecha_oferta date,
    id_reclutador_oferta integer,
    "R2R" text,
    tipo_casa character varying(255),
    trabajo_actual character varying(255),
    razon_cambio_trabajo character varying(255),
    reubicacion boolean,
    estado_civil character varying(255),
    dependientes_economicos integer,
    ingresos_extras character varying(255),
    ingreso_extra_fam character varying(255),
    proceso_reclutamiento boolean
);


--
-- Name: candidatos_idcandidato_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.candidatos_idcandidato_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: candidatos_idcandidato_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.candidatos_idcandidato_seq OWNED BY public.candidatos.id_candidato;


--
-- Name: catalogo_estatus; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.catalogo_estatus (
    id_estatus integer NOT NULL,
    tipo_estatus character varying(20) NOT NULL,
    secuencia integer NOT NULL,
    estatus character varying(25) NOT NULL,
    razon character varying(150) NOT NULL
);


--
-- Name: catalogo_estatus_id_estatus_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.catalogo_estatus_id_estatus_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: catalogo_estatus_id_estatus_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.catalogo_estatus_id_estatus_seq OWNED BY public.catalogo_estatus.id_estatus;


--
-- Name: catalogos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.catalogos (
    categoria character varying(25) NOT NULL,
    elemento character varying(25) NOT NULL,
    valor integer NOT NULL,
    id_catalogo integer NOT NULL,
    secuencia smallint,
    lenguaje character varying(10)
);


--
-- Name: catalogos_id_catalogo_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.catalogos_id_catalogo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: catalogos_id_catalogo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.catalogos_id_catalogo_seq OWNED BY public.catalogos.id_catalogo;


--
-- Name: empresa; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.empresa (
    id_empresa integer NOT NULL,
    nombre_corto character varying(20) NOT NULL,
    razon_social character varying NOT NULL,
    rfc character(13) NOT NULL,
    direccion1 character varying(100),
    direccion2 character varying(100),
    codigo_postal character(5),
    ciudad character varying(50),
    estado character varying(50),
    pais character varying(25),
    departamento character varying(50)
);


--
-- Name: empresa_idempresa_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.empresa_idempresa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: empresa_idempresa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.empresa_idempresa_seq OWNED BY public.empresa.id_empresa;


--
-- Name: evaluaciones; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.evaluaciones (
    id_evaluacion integer NOT NULL,
    fecha_evaluacion date NOT NULL,
    veredicto integer NOT NULL,
    id_persona integer NOT NULL,
    id_vacante integer NOT NULL,
    id_tipo_evaluacion integer,
    comentario_general text
);


--
-- Name: evaluaciones_candidatos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.evaluaciones_candidatos (
    id_evaluacion integer NOT NULL,
    id_candidato integer NOT NULL,
    id_skill integer NOT NULL,
    calificacion integer NOT NULL,
    comentarios text NOT NULL
);


--
-- Name: evaluaciones_id_evaluacion_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.evaluaciones ALTER COLUMN id_evaluacion ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.evaluaciones_id_evaluacion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: evaluador_vacantes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.evaluador_vacantes (
    id_persona integer NOT NULL,
    id_vacante integer NOT NULL,
    id_reclutador integer
);


--
-- Name: grupo_skills; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.grupo_skills (
    id_grupo_skill integer NOT NULL,
    nombre character varying(50),
    secuencia smallint,
    lenguaje character varying(30)
);


--
-- Name: gruposkills_idgruposkill_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.gruposkills_idgruposkill_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: gruposkills_idgruposkill_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.gruposkills_idgruposkill_seq OWNED BY public.grupo_skills.id_grupo_skill;


--
-- Name: notas_candidato; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notas_candidato (
    id_candidato integer,
    persona_creacion integer,
    nota text,
    fecha_creacion bigint,
    activo boolean DEFAULT true,
    id_nota integer NOT NULL
);


--
-- Name: notas_candidato_id_nota_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.notas_candidato_id_nota_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: notas_candidato_id_nota_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.notas_candidato_id_nota_seq OWNED BY public.notas_candidato.id_nota;


--
-- Name: personas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.personas (
    id_persona integer NOT NULL,
    nombre character varying,
    apellido_paterno character varying(30) NOT NULL,
    apellido_materno character varying(30) NOT NULL,
    tel_celular character varying(14) NOT NULL,
    email character varying(30) NOT NULL,
    pass character varying(8),
    id_rol integer,
    id_empresa integer,
    ubicacion text,
    id_idioma_preferido character varying(30)
);


--
-- Name: personas_idpersona_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.personas_idpersona_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: personas_idpersona_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.personas_idpersona_seq OWNED BY public.personas.id_persona;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    id_rol integer NOT NULL,
    rol character varying(15) NOT NULL
);


--
-- Name: roles_id_rol_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.roles_id_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: roles_id_rol_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.roles_id_rol_seq OWNED BY public.roles.id_rol;


--
-- Name: skills; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.skills (
    id_skill integer NOT NULL,
    id_grupo_skill integer,
    nombre character varying(50),
    secuencia smallint,
    lenguaje character varying(30)
);


--
-- Name: skills_candidatos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.skills_candidatos (
    id_candidato integer NOT NULL,
    id_skill integer NOT NULL,
    nivel integer NOT NULL,
    comentarios character varying(500),
    activo boolean DEFAULT true NOT NULL
);


--
-- Name: skills_idskill_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.skills_idskill_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: skills_idskill_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.skills_idskill_seq OWNED BY public.skills.id_skill;


--
-- Name: skills_vacantes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.skills_vacantes (
    id_vacante integer NOT NULL,
    id_skill integer NOT NULL,
    nivel integer NOT NULL,
    comentarios character varying(300),
    activo boolean DEFAULT true NOT NULL
);


--
-- Name: tiempo_vacantes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tiempo_vacantes (
    id_tiempo_vacante integer NOT NULL,
    tiempo_vacante character varying(25),
    secuencia smallint,
    lenguaje character varying(30)
);


--
-- Name: tipo_contratos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tipo_contratos (
    id_tipo_contrato integer NOT NULL,
    tipo_contrato character varying(50) NOT NULL,
    secuencia smallint,
    lenguaje character varying(30)
);


--
-- Name: tipocontratos_idtipocontrato_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tipocontratos_idtipocontrato_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tipocontratos_idtipocontrato_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tipocontratos_idtipocontrato_seq OWNED BY public.tipo_contratos.id_tipo_contrato;


--
-- Name: tipovacantes_idtipovacante_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tipovacantes_idtipovacante_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tipovacantes_idtipovacante_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tipovacantes_idtipovacante_seq OWNED BY public.tiempo_vacantes.id_tiempo_vacante;


--
-- Name: vacantes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vacantes (
    id_vacante integer NOT NULL,
    id_empresa integer,
    nombre_corto character varying,
    descripcion character varying(250),
    id_tiempo_vacante integer,
    id_tipo_contrato integer NOT NULL,
    ciudad character varying(50),
    duracion character varying(50),
    requerimientos text,
    costo_maximo real,
    fecha_inicio date,
    posiciones integer,
    prioridad integer,
    comentarios text,
    activo boolean DEFAULT true,
    id_estatus integer,
    id_reclutador_creacion integer,
    id_reclutador_asignado integer,
    tarifa real,
    id_empresa_contratante integer,
    trabajando_actualmente boolean,
    empresa_empleadora character varying(255)
);


--
-- Name: vacantes_idvacante_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.vacantes_idvacante_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: vacantes_idvacante_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.vacantes_idvacante_seq OWNED BY public.vacantes.id_vacante;


--
-- Name: candidatos id_candidato; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.candidatos ALTER COLUMN id_candidato SET DEFAULT nextval('public.candidatos_idcandidato_seq'::regclass);


--
-- Name: catalogo_estatus id_estatus; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catalogo_estatus ALTER COLUMN id_estatus SET DEFAULT nextval('public.catalogo_estatus_id_estatus_seq'::regclass);


--
-- Name: catalogos id_catalogo; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catalogos ALTER COLUMN id_catalogo SET DEFAULT nextval('public.catalogos_id_catalogo_seq'::regclass);


--
-- Name: empresa id_empresa; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.empresa ALTER COLUMN id_empresa SET DEFAULT nextval('public.empresa_idempresa_seq'::regclass);


--
-- Name: grupo_skills id_grupo_skill; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grupo_skills ALTER COLUMN id_grupo_skill SET DEFAULT nextval('public.gruposkills_idgruposkill_seq'::regclass);


--
-- Name: notas_candidato id_nota; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notas_candidato ALTER COLUMN id_nota SET DEFAULT nextval('public.notas_candidato_id_nota_seq'::regclass);


--
-- Name: personas id_persona; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personas ALTER COLUMN id_persona SET DEFAULT nextval('public.personas_idpersona_seq'::regclass);


--
-- Name: roles id_rol; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles ALTER COLUMN id_rol SET DEFAULT nextval('public.roles_id_rol_seq'::regclass);


--
-- Name: skills id_skill; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skills ALTER COLUMN id_skill SET DEFAULT nextval('public.skills_idskill_seq'::regclass);


--
-- Name: tiempo_vacantes id_tiempo_vacante; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tiempo_vacantes ALTER COLUMN id_tiempo_vacante SET DEFAULT nextval('public.tipovacantes_idtipovacante_seq'::regclass);


--
-- Name: tipo_contratos id_tipo_contrato; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tipo_contratos ALTER COLUMN id_tipo_contrato SET DEFAULT nextval('public.tipocontratos_idtipocontrato_seq'::regclass);


--
-- Name: vacantes id_vacante; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vacantes ALTER COLUMN id_vacante SET DEFAULT nextval('public.vacantes_idvacante_seq'::regclass);


--
-- Data for Name: candidato_vacante; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.candidato_vacante (id_candidato, id_vacante, id_reclutador, fecha_asignacion, estatus_candidato_proceso) FROM stdin;
6	2	1	2019-03-28	2
6	7	1	2019-03-28	2
6	13	1	2019-03-28	2
6	16	1	2019-03-28	2
7	6	1	2019-03-28	2
7	35	1	2019-03-28	2
7	36	1	2019-03-28	2
\.


--
-- Data for Name: candidatos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.candidatos (id_candidato, id_persona, pais, ciudad, codigo_postal, fecha_graduacion, universidad, curriculum_vitae, cv_digital, foto, skype, grado_estudios, grado_ingles, activo, sueldo_actual, prestaciones_actual, expectativa_actual, fecha_actualizacion, id_reclutador_alta, id_fuente, oferta, fecha_oferta, id_reclutador_oferta, "R2R", tipo_casa, trabajo_actual, razon_cambio_trabajo, reubicacion, estado_civil, dependientes_economicos, ingresos_extras, ingreso_extra_fam, proceso_reclutamiento) FROM stdin;
4	9	Mexico	Mty	64000	2000-06-18	UdN	Estudios y carre en Informatica	\N	\N	jotape	3	2	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
5	10	Mexico	Mty	64000	2000-06-18	UdN	Estudios y carre en Informatica	\N	\N	jotape	3	2	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
6	11	Mexico	Mty	64000	2000-06-18	UdN	Estudios y carre en Informatica	\N	\N	jotape	3	2	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
7	12	Mexico	Mty	64000	2000-06-18	UdN	Estudios y carre en Informatica	\N	\N	jotape	3	2	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
8	13	Mexico	Mty	64000	2000-06-18	UdN	Estudios y carre en Informatica	\N	\N	jotape	3	2	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
9	14	Mexico	Mty	64000	2000-06-18	UdN	Estudios y carre en Informatica	\N	\N	jotape	3	2	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
1	6	Mexico	Saltillo	64000	2000-06-18	UdN	Estudios y carre en Informatica	asdfas	\N	jotape	3	2	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
10	15	Mexico	Saltillo	68900	2000-06-18	UdN	Estudios y carre en Informatica	\N	\N	jotape	3	2	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
11	16	Mexico	Saltillo	68900	2000-06-18	UdN	Estudios y carre en Informatica	\N	\N	jotape	3	2	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
2	7	Mexico	Monterrey	64695	2000-06-18	UdN	Estudios y carre en Informatica	\N	\N	jotape	3	2	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
12	17	Mexico	Monterrey	64000	2007-05-25	UN	Estudios y carrera en Informatica administrativa	\N	\N	sky001	3	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
14	25	\N	\N	\N	\N	\N	Experiencia laboral: Empresa: OpenpayMX Posicion: Jefe de recursos humanos Tiempo Laborado: may. de 2017 – actualidad Descripcion del Puesto: undefined Empresa: Software Next Door Posicion: RH Tiempo Laborado: dic. de 2011 – may. de 2017 Descripcion del Puesto: undefined Empresa: Outhelping Posicion: Coord. de R&S Tiempo Laborado: ago. de 2010 – dic. de 2011 Descripcion del Puesto: undefined Empresa: TOTVS Posicion: Coordinador de R&S de TI Tiempo Laborado: dic. de 2009 – jul. de 2010 Descripcion del Puesto: undefined Empresa: HITSS CORPORATIVO Posicion: Analista de Recursos Humanos Tiempo Laborado: sept. de 2006 – dic. de 2009 Descripcion del Puesto: undefined 	\N	\N	deycims.rios (Skype)	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
15	27	México	SANTA CATARINA	66354	2018-12-03	tECNOLOGICO	INT. TICS	\N	\N	OSCAR	\N	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
18	30	México	SANTA  CATARINA	66354	2018-12-03	tECNOLOGICO	INT. TICS	\N	\N	OSCAR	\N	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
20	32	México	SANTA  CATARINA	66354	2018-12-03	tECNOLOGICO	INT. TICS	\N	\N	OSCAR	\N	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
21	33	México	SANTA  CATARINA	66354	2018-12-03	tECNOLOGICO	INT. TICS	\N	\N	OSCAR	\N	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
3	8	Mexico	Mty	64000	2000-06-18	UdN	Estudios y carre en Informatica	\N	\N	jotape	3	2	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
24	36	\N	\N	\N	\N	\N	Experiencia laboral: Empresa: OpenpayMX Posicion: Jefe de recursos humanos Tiempo Laborado: may. de 2017 – actualidad Descripcion del Puesto: undefined Empresa: Software Next Door Posicion: RH Tiempo Laborado: dic. de 2011 – may. de 2017 Descripcion del Puesto: undefined Empresa: Outhelping Posicion: Coord. de R&S Tiempo Laborado: ago. de 2010 – dic. de 2011 Descripcion del Puesto: undefined Empresa: TOTVS Posicion: Coordinador de R&S de TI Tiempo Laborado: dic. de 2009 – jul. de 2010 Descripcion del Puesto: undefined Empresa: HITSS CORPORATIVO Posicion: Analista de Recursos Humanos Tiempo Laborado: sept. de 2006 – dic. de 2009 Descripcion del Puesto: undefined 	\N	\N	deycims.rios (Skype)	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: catalogo_estatus; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.catalogo_estatus (id_estatus, tipo_estatus, secuencia, estatus, razon) FROM stdin;
1	Vacantes	1	Creada	La vacante ha sido creada
2	Candidatos	1	01Pending	Invitacion enviada
\.


--
-- Data for Name: catalogos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.catalogos (categoria, elemento, valor, id_catalogo, secuencia, lenguaje) FROM stdin;
Estudios	Preparatoria	1	1	1	ESP
Estudios	Licenciatura	2	2	2	ESP
Estudios	Maestria	3	3	3	ESP
Estudios	Doctorado	4	4	4	ESP
Nivel	Basico	1	5	1	ESP
Nivel	Intermedio	2	6	2	ESP
Nivel	Avanzado	3	7	3	ESP
Skill	No lo conosco	0	8	1	ESP
Skill	Principiante	1	9	2	ESP
Skill	Intermedio	2	10	3	ESP
Skill	Avanzado	3	11	4	ESP
Skill	Experto	4	12	5	ESP
Prioridad	Alta	3	13	3	ESP
Prioridad	Media	2	14	2	ESP
Prioridad	Baja	1	15	1	ESP
\.


--
-- Data for Name: empresa; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.empresa (id_empresa, nombre_corto, razon_social, rfc, direccion1, direccion2, codigo_postal, ciudad, estado, pais, departamento) FROM stdin;
1	SOFT	Sistemas Oficinas Tecnicos	XAXX010101000	Calle numero	Colonia	64000	Monterrey	Nuevo Leon	Mexico	
\.


--
-- Data for Name: evaluaciones; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.evaluaciones (id_evaluacion, fecha_evaluacion, veredicto, id_persona, id_vacante, id_tipo_evaluacion, comentario_general) FROM stdin;
2	2019-03-08	2	1	2	\N	\N
3	2019-03-08	2	1	2	\N	\N
14	2019-03-08	2	1	2	\N	\N
15	2019-03-15	3	4	6	\N	\N
\.


--
-- Data for Name: evaluaciones_candidatos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.evaluaciones_candidatos (id_evaluacion, id_candidato, id_skill, calificacion, comentarios) FROM stdin;
14	11	1	3	Buena pronunciacion
14	11	2	2	CNNA
14	11	4	2	Bastante conocimiento
14	11	5	3	Lo esta usando actualmente
14	11	7	1	Diplomado
15	8	3	2	Comentarios acerca de la evaluacion
15	8	5	3	Comentarios acerca de la evaluacion
\.


--
-- Data for Name: evaluador_vacantes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.evaluador_vacantes (id_persona, id_vacante, id_reclutador) FROM stdin;
1	2	\N
1	7	\N
1	13	\N
1	16	\N
4	6	\N
4	35	\N
4	36	\N
\.


--
-- Data for Name: grupo_skills; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.grupo_skills (id_grupo_skill, nombre, secuencia, lenguaje) FROM stdin;
1	Generales	\N	\N
2	Redes	\N	\N
3	Programacion BE	\N	\N
4	Programacion FE	\N	\N
5	Comercial	\N	\N
6	'E-Commerce'	\N	\N
7	Avanzado	\N	\N
\.


--
-- Data for Name: notas_candidato; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notas_candidato (id_candidato, persona_creacion, nota, fecha_creacion, activo, id_nota) FROM stdin;
12	1	La primera nota	358	t	1
12	4	Segunda nota desde postman	2936478392093847600	f	2
24	4	Nota Remota con returning	1555377874909	t	4
24	4	Nota Remota con returning	1555377874909	t	5
\.


--
-- Data for Name: personas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.personas (id_persona, nombre, apellido_paterno, apellido_materno, tel_celular, email, pass, id_rol, id_empresa, ubicacion, id_idioma_preferido) FROM stdin;
16	Katty	Perry	Jhonson	+2664955285	mail16@mail.com	kp_001	1	\N	\N	\N
6	Juan	Perez	Ramirez	8110485926	mail6@mail.com	pass1234	1	\N	\N	\N
9	Juan	Perez	Ramirez	8110485926	mail9@mail.com	pass1234	1	\N	\N	\N
10	Juan	Perez	Ramirez	8110485926	mail10@mail.com	pass1234	1	\N	\N	\N
11	Juan	Perez	Ramirez	8110485926	mail11@mail.com	pass1234	1	\N	\N	\N
12	Juan	Perez	Ramirez	8110485926	mail12@mail.com	pass1234	1	\N	\N	\N
13	Juan	Perez	Ramirez	8110485926	mail13@mail.com	pass1234	1	\N	\N	\N
14	Juan	Perez	Ramirez	8110485926	mail14@mail.com	pass1234	1	\N	\N	\N
15	Juan Pedro	Paco	de la Mar	8110485926	mail15@mail.com	pass1234	1	\N	\N	\N
7	Jose	Perales	Ramirez	8110485926	mail7@mail.com	pass1234	1	\N	\N	\N
17	Jorge	Smith	Lopez	8110485926	prueba@mail.com	\N	1	\N	\N	\N
8	Juan	Perez	Ramirez	8110485926	jPerezR@aol.com	pass1234	1	\N	\N	\N
25	Deyci	Sánchez		(55) 4170 356	deyci.sanchez@openpay.mx	pass1234	1	\N	\N	\N
27	OSCAR MIGUEL	SALAZAR	RODRIGUEZ	4696031329	rora.8218@gmail.com	Pass1234	1	\N	\N	\N
30	OSCAR  MIGUEL	SALAZAR	RODRIGUEZ	4696031329	mailOr@gmail.com	\N	1	\N	\N	\N
32	OSCAR  MIGUEL	SALAZAR	RODRIGUEZ	4696031329	mailOr@gmail.com	\N	1	\N	\N	\N
33	OSCAR  MIGUEL	SALAZAR	RODRIGUEZ	4696031329	mailOr@gmail.com	\N	1	\N	\N	\N
36	Deyci	Sánchez		(55) 4170 356	deyci.sanchez@openpay.mx	\N	1	\N	\N	\N
1	Pedro	Pablo			mail1@mail.com	\N	2	\N	\N	\N
4	Juan	Perez	Ramirez	8110485926	mail4@mail.com	pass1234	2	\N	\N	\N
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.roles (id_rol, rol) FROM stdin;
1	Candidato
2	Reclutador
3	Evaluador
4	Administrador
5	Super-Admin
\.


--
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.skills (id_skill, id_grupo_skill, nombre, secuencia, lenguaje) FROM stdin;
1	1	Ingles	1	\N
2	2	Cisco	1	\N
3	2	TCP/IP	2	\N
4	3	C#	1	\N
5	3	Java	2	\N
6	4	Javascript	1	\N
7	4	CSS	2	\N
8	1	'Frances'	2	\N
9	1	'Frances'	3	\N
10	1	'Frances'	4	\N
11	1	'Japones'	5	\N
\.


--
-- Data for Name: skills_candidatos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.skills_candidatos (id_candidato, id_skill, nivel, comentarios, activo) FROM stdin;
18	1	1	\N	t
20	1	1	\N	t
21	1	1	\N	t
3	1	4	comentario de skill	t
3	3	2	\N	t
3	5	2	\N	t
3	9	1	\N	t
3	11	1	Este skil es de prueba	t
\.


--
-- Data for Name: skills_vacantes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.skills_vacantes (id_vacante, id_skill, nivel, comentarios, activo) FROM stdin;
52	1	4	\N	t
52	5	4	\N	t
52	8	1	\N	t
52	3	2	\N	t
53	1	2	skill desde un principio	t
53	3	3	\N	t
53	9	2	\N	t
\.


--
-- Data for Name: tiempo_vacantes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tiempo_vacantes (id_tiempo_vacante, tiempo_vacante, secuencia, lenguaje) FROM stdin;
1	Completo	1	\N
2	Parcial	2	\N
3	Proyecto	3	\N
\.


--
-- Data for Name: tipo_contratos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tipo_contratos (id_tipo_contrato, tipo_contrato, secuencia, lenguaje) FROM stdin;
4	Nomina	1	\N
5	Mixto	2	\N
6	Honorarios	3	\N
\.


--
-- Data for Name: vacantes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vacantes (id_vacante, id_empresa, nombre_corto, descripcion, id_tiempo_vacante, id_tipo_contrato, ciudad, duracion, requerimientos, costo_maximo, fecha_inicio, posiciones, prioridad, comentarios, activo, id_estatus, id_reclutador_creacion, id_reclutador_asignado, tarifa, id_empresa_contratante, trabajando_actualmente, empresa_empleadora) FROM stdin;
2	\N	vacante 2	vacante para ciudad	2	6	Monterrey	varios meses	programacion	15000	2019-05-02	2	4	asdfasdf	f	\N	\N	\N	\N	\N	\N	\N
6	\N	vac	desc	2	6	ciu	dur	req	1	2016-01-01	3	1	r	t	\N	\N	\N	\N	\N	\N	\N
36	\N	vacante 6	desc	2	6	ciu	dur	req	1	2016-01-01	3	2	r	t	\N	\N	\N	\N	\N	\N	\N
37	\N	gruop skills 1	asfasdf	2	6	asdfasdf	asdf	asdfasdf	45	2019-02-05	1	2	\N	t	\N	\N	\N	\N	\N	\N	\N
35	\N	grupo skills 3	asfasdf	2	6	asdfasdf	asdf	asdfasdf	45	2019-02-05	1	2	\N	t	\N	\N	\N	\N	\N	\N	\N
38	\N	vacante 6	desc	2	6	ciu	dur	req	1	2016-01-01	3	2	r	t	\N	\N	\N	\N	\N	\N	\N
44	\N	vacante prueba	descripcion de la vacante	1	4	monterrey	6 meses	Programacion oreintada a objetos	25000	2019-01-01	2	1		t	1	1	4	10000	1	f	
41	\N	vacante prueba	descripcion de la vacante	1	4	monterrey	6 meses	Programacion oreintada a objetos	25000	2019-01-01	2	1		t	1	1	4	10000	1	f	
52	\N	vacante 6	desc	2	6	ciu	dur	req	1	2016-01-01	3	2	r	t	\N	\N	\N	\N	\N	\N	\N
53	\N	Java Sr	Java Sr 4+	1	4	Monterrey	5 años	+5 años usando Java	250	2017-04-12	5	1	\N	t	\N	\N	\N	\N	\N	\N	\N
4	\N	vac	desc	2	6	ciu	dur	req	1	2016-01-01	3	1	r	t	\N	\N	\N	\N	\N	\N	\N
5	\N	vac	desc	2	6	ciu	dur	req	1	2016-01-01	3	1	r	t	\N	\N	\N	\N	\N	\N	\N
7	\N	vac	desc	2	6	ciu	dur	req	1	2016-01-01	3	1	r	t	\N	\N	\N	\N	\N	\N	\N
8	\N	vac	desc	2	6	ciu	dur	req	1	2016-01-01	3	1	r	t	\N	\N	\N	\N	\N	\N	\N
9	\N	vac	desc	2	6	ciu	dur	req	1	2016-01-01	3	1	r	t	\N	\N	\N	\N	\N	\N	\N
10	\N	vac	desc	2	6	ciu	dur	req	1	2016-01-01	3	1	r	t	\N	\N	\N	\N	\N	\N	\N
11	\N	vac	desc	2	6	ciu	dur	req	1	2016-01-01	3	1	r	t	\N	\N	\N	\N	\N	\N	\N
13	\N	vac	desc	2	6	ciu	dur	req	1	2016-01-01	3	1	r	t	\N	\N	\N	\N	\N	\N	\N
14	\N	vac	desc	2	6	ciu	dur	req	1	2016-01-01	3	1	r	t	\N	\N	\N	\N	\N	\N	\N
15	\N	vac	desc	2	6	ciu	dur	req	1	2016-01-01	3	1	r	t	\N	\N	\N	\N	\N	\N	\N
16	\N	vac	desc	2	6	ciu	dur	req	1	2016-01-01	3	1	r	t	\N	\N	\N	\N	\N	\N	\N
17	\N	vac	desc	2	6	ciu	dur	req	1	2016-01-01	3	1	r	t	\N	\N	\N	\N	\N	\N	\N
18	\N	vac	desc	2	6	ciu	dur	req	1	2016-01-01	3	1	r	t	\N	\N	\N	\N	\N	\N	\N
19	\N	vac	desc	2	6	ciu	dur	req	1	2016-01-01	3	1	r	t	\N	\N	\N	\N	\N	\N	\N
20	\N	vac	desc	2	6	ciu	dur	req	1	2016-01-01	3	1	r	t	\N	\N	\N	\N	\N	\N	\N
21	\N	ddddd	asdf	1	4	MTY	varios meses	programacion	15000	2019-05-02	3	4	asdfasdf	t	\N	\N	\N	\N	\N	\N	\N
22	\N	ddddd	asdf	1	4	MTY	varios meses	programacion	15000	2019-05-02	3	4	asdfasdf	t	\N	\N	\N	\N	\N	\N	\N
23	\N	ddddd	vacante para ciudad	1	4	Monterrey	varios meses	programacion	15000	2019-01-01	2	4	asdfasdf	t	\N	\N	\N	\N	\N	\N	\N
24	\N	vacante 2	vacante para ciudad	1	4	Monterrey	varios meses	programacion	15000	2019-05-02	2	4		t	\N	\N	\N	\N	\N	\N	\N
25	\N	vacante 2	vacante para ciudad	1	4	Monterrey	varios meses	programacion	15000	2019-05-02	2	4		t	\N	\N	\N	\N	\N	\N	\N
26	\N	vacante 2	vacante para ciudad	1	4	Monterrey	año	programacion	15000	2019-05-02	3	4	asdfasdf	t	\N	\N	\N	\N	\N	\N	\N
27	\N	vacante 2	vacante para ciudad	1	4	Monterrey	año	programacion	15000	2019-05-02	3	4	asdfasdf	t	\N	\N	\N	\N	\N	\N	\N
28	\N	vacante 2	vacante para ciudad	1	4	Monterrey	año	programacion	15000	2019-05-02	3	4	asdfasdf	t	\N	\N	\N	\N	\N	\N	\N
29	\N	vacante 2	vacante para ciudad	1	4	Monterrey	año	programacion	15000	2019-05-02	3	4	asdfasdf	t	\N	\N	\N	\N	\N	\N	\N
30	\N	vacante 2	vacante para ciudad	1	4	Monterrey	año	programacion	15000	2019-05-02	3	4	asdfasdf	t	\N	\N	\N	\N	\N	\N	\N
31	\N	vacante 2	vacante para ciudad	1	4	Monterrey	año	programacion	15000	2019-05-02	3	4	asdfasdf	t	\N	\N	\N	\N	\N	\N	\N
32	\N	ddddd	vacante para ciudad	2	6	adfasdf	varios meses	TI	1000	2019-01-01	2	4	pp	t	\N	\N	\N	\N	\N	\N	\N
12	\N	vac	desc	2	6	ciu	dur	req	1	2016-01-01	3	1	r	t	\N	\N	\N	\N	\N	\N	\N
3	\N	ddddd	asdf123	3	5	MTY	año	TI	1000	2019-01-01	3	4	varios comentarios	t	\N	\N	\N	\N	\N	\N	\N
1	\N	vacante de demo	descripcion de la primera vacante	1	5		5 meses	Programacion avanzada en JS, Express, PostgreSQL. manejo de tiempos y administracion de proyectos	20000	2019-02-01	2	4	no comments	t	\N	\N	\N	\N	\N	\N	\N
33	\N	vacante 2	vacante para ciudad	1	4	Monterrey	año	programacion	15000	2019-05-02	3	4	asdfasdf	t	\N	\N	\N	\N	\N	\N	\N
34	\N	vacante 2	vacante para ciudad	1	4	Monterrey	año	programacion	15000	2019-05-02	3	4	asdfasdf	t	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Name: candidatos_idcandidato_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.candidatos_idcandidato_seq', 26, true);


--
-- Name: catalogo_estatus_id_estatus_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.catalogo_estatus_id_estatus_seq', 2, true);


--
-- Name: catalogos_id_catalogo_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.catalogos_id_catalogo_seq', 15, true);


--
-- Name: empresa_idempresa_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.empresa_idempresa_seq', 1, true);


--
-- Name: evaluaciones_id_evaluacion_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.evaluaciones_id_evaluacion_seq', 15, true);


--
-- Name: gruposkills_idgruposkill_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.gruposkills_idgruposkill_seq', 7, true);


--
-- Name: notas_candidato_id_nota_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.notas_candidato_id_nota_seq', 5, true);


--
-- Name: personas_idpersona_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.personas_idpersona_seq', 38, true);


--
-- Name: roles_id_rol_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_id_rol_seq', 5, true);


--
-- Name: skills_idskill_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.skills_idskill_seq', 11, true);


--
-- Name: tipocontratos_idtipocontrato_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tipocontratos_idtipocontrato_seq', 6, true);


--
-- Name: tipovacantes_idtipovacante_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tipovacantes_idtipovacante_seq', 3, true);


--
-- Name: vacantes_idvacante_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.vacantes_idvacante_seq', 53, true);


--
-- Name: candidatos candidatos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.candidatos
    ADD CONSTRAINT candidatos_pkey PRIMARY KEY (id_candidato);


--
-- Name: catalogo_estatus catalogo_estatus_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catalogo_estatus
    ADD CONSTRAINT catalogo_estatus_pkey PRIMARY KEY (id_estatus);


--
-- Name: catalogos catalogos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catalogos
    ADD CONSTRAINT catalogos_pkey PRIMARY KEY (id_catalogo);


--
-- Name: empresa empresa_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.empresa
    ADD CONSTRAINT empresa_pkey PRIMARY KEY (id_empresa);


--
-- Name: grupo_skills gruposkills_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grupo_skills
    ADD CONSTRAINT gruposkills_pkey PRIMARY KEY (id_grupo_skill);


--
-- Name: notas_candidato notas_candidato_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notas_candidato
    ADD CONSTRAINT notas_candidato_pkey PRIMARY KEY (id_nota);


--
-- Name: personas personas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT personas_pkey PRIMARY KEY (id_persona);


--
-- Name: evaluaciones pk_evaluacion_id_evaluacion; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluaciones
    ADD CONSTRAINT pk_evaluacion_id_evaluacion PRIMARY KEY (id_evaluacion);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id_rol);


--
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (id_skill);


--
-- Name: tipo_contratos tipocontratos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tipo_contratos
    ADD CONSTRAINT tipocontratos_pkey PRIMARY KEY (id_tipo_contrato);


--
-- Name: tiempo_vacantes tipovacantes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tiempo_vacantes
    ADD CONSTRAINT tipovacantes_pkey PRIMARY KEY (id_tiempo_vacante);


--
-- Name: vacantes vacantes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vacantes
    ADD CONSTRAINT vacantes_pkey PRIMARY KEY (id_vacante);


--
-- Name: candidato_vacante fk_candidato_vacante_candidatos; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.candidato_vacante
    ADD CONSTRAINT fk_candidato_vacante_candidatos FOREIGN KEY (id_candidato) REFERENCES public.candidatos(id_candidato);


--
-- Name: candidato_vacante fk_candidato_vacante_estatus; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.candidato_vacante
    ADD CONSTRAINT fk_candidato_vacante_estatus FOREIGN KEY (estatus_candidato_proceso) REFERENCES public.catalogo_estatus(id_estatus);


--
-- Name: candidato_vacante fk_candidato_vacante_personas; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.candidato_vacante
    ADD CONSTRAINT fk_candidato_vacante_personas FOREIGN KEY (id_reclutador) REFERENCES public.personas(id_persona);


--
-- Name: candidato_vacante fk_candidato_vacante_vacantes; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.candidato_vacante
    ADD CONSTRAINT fk_candidato_vacante_vacantes FOREIGN KEY (id_vacante) REFERENCES public.vacantes(id_vacante);


--
-- Name: evaluaciones_candidatos fk_ec_candidatos; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluaciones_candidatos
    ADD CONSTRAINT fk_ec_candidatos FOREIGN KEY (id_candidato) REFERENCES public.candidatos(id_candidato);


--
-- Name: evaluaciones_candidatos fk_ec_evaluaciones; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluaciones_candidatos
    ADD CONSTRAINT fk_ec_evaluaciones FOREIGN KEY (id_evaluacion) REFERENCES public.evaluaciones(id_evaluacion);


--
-- Name: evaluaciones_candidatos fk_ec_skills; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluaciones_candidatos
    ADD CONSTRAINT fk_ec_skills FOREIGN KEY (id_skill) REFERENCES public.skills(id_skill);


--
-- Name: evaluaciones fk_evaluaciones_personas; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluaciones
    ADD CONSTRAINT fk_evaluaciones_personas FOREIGN KEY (id_persona) REFERENCES public.personas(id_persona);


--
-- Name: evaluaciones fk_evaluaciones_vacantes; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluaciones
    ADD CONSTRAINT fk_evaluaciones_vacantes FOREIGN KEY (id_vacante) REFERENCES public.vacantes(id_vacante);


--
-- Name: evaluador_vacantes fk_evaluador_vacante_persona(reclutador); Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluador_vacantes
    ADD CONSTRAINT "fk_evaluador_vacante_persona(reclutador)" FOREIGN KEY (id_reclutador) REFERENCES public.personas(id_persona);


--
-- Name: evaluador_vacantes fk_evaluador_vacantes_personas; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluador_vacantes
    ADD CONSTRAINT fk_evaluador_vacantes_personas FOREIGN KEY (id_persona) REFERENCES public.personas(id_persona);


--
-- Name: evaluador_vacantes fk_evaluador_vacantes_vacantes; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluador_vacantes
    ADD CONSTRAINT fk_evaluador_vacantes_vacantes FOREIGN KEY (id_vacante) REFERENCES public.vacantes(id_vacante);


--
-- Name: personas fk_personas_empresa; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT fk_personas_empresa FOREIGN KEY (id_empresa) REFERENCES public.empresa(id_empresa);


--
-- Name: personas fk_personas_rol; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT fk_personas_rol FOREIGN KEY (id_rol) REFERENCES public.roles(id_rol);


--
-- Name: notas_candidato notas_candidato_id_candidato_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notas_candidato
    ADD CONSTRAINT notas_candidato_id_candidato_fkey FOREIGN KEY (id_candidato) REFERENCES public.candidatos(id_candidato);


--
-- Name: notas_candidato notas_candidato_persona_creacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notas_candidato
    ADD CONSTRAINT notas_candidato_persona_creacion_fkey FOREIGN KEY (persona_creacion) REFERENCES public.personas(id_persona);


--
-- Name: candidatos ref_candidatos_to_personas; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.candidatos
    ADD CONSTRAINT ref_candidatos_to_personas FOREIGN KEY (id_persona) REFERENCES public.personas(id_persona);


--
-- Name: skills ref_skills_to_grupo.skills; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT "ref_skills_to_grupo.skills" FOREIGN KEY (id_grupo_skill) REFERENCES public.grupo_skills(id_grupo_skill);


--
-- Name: vacantes ref_vacantes_empresa; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vacantes
    ADD CONSTRAINT ref_vacantes_empresa FOREIGN KEY (id_empresa_contratante) REFERENCES public.empresa(id_empresa);


--
-- Name: vacantes ref_vacantes_estatus; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vacantes
    ADD CONSTRAINT ref_vacantes_estatus FOREIGN KEY (id_estatus) REFERENCES public.catalogo_estatus(id_estatus);


--
-- Name: vacantes ref_vacantes_personas; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vacantes
    ADD CONSTRAINT ref_vacantes_personas FOREIGN KEY (id_reclutador_creacion) REFERENCES public.personas(id_persona);


--
-- Name: vacantes ref_vacantes_personas_asignado; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vacantes
    ADD CONSTRAINT ref_vacantes_personas_asignado FOREIGN KEY (id_reclutador_asignado) REFERENCES public.personas(id_persona);


--
-- Name: vacantes ref_vacantes_to_empresa; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vacantes
    ADD CONSTRAINT ref_vacantes_to_empresa FOREIGN KEY (id_empresa) REFERENCES public.empresa(id_empresa);


--
-- Name: vacantes ref_vacantes_to_tiempo.vacantes; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vacantes
    ADD CONSTRAINT "ref_vacantes_to_tiempo.vacantes" FOREIGN KEY (id_tiempo_vacante) REFERENCES public.tiempo_vacantes(id_tiempo_vacante);


--
-- Name: vacantes ref_vacantes_to_tipo.contrato; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vacantes
    ADD CONSTRAINT "ref_vacantes_to_tipo.contrato" FOREIGN KEY (id_tipo_contrato) REFERENCES public.tipo_contratos(id_tipo_contrato);


--
-- Name: skills_candidatos skills_candidato_id_candidato_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skills_candidatos
    ADD CONSTRAINT skills_candidato_id_candidato_fkey FOREIGN KEY (id_candidato) REFERENCES public.candidatos(id_candidato);


--
-- Name: skills_candidatos skills_candidato_id_skill_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skills_candidatos
    ADD CONSTRAINT skills_candidato_id_skill_fkey FOREIGN KEY (id_skill) REFERENCES public.skills(id_skill);


--
-- Name: skills_vacantes skills_vacantes_id_skill_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skills_vacantes
    ADD CONSTRAINT skills_vacantes_id_skill_fkey FOREIGN KEY (id_skill) REFERENCES public.skills(id_skill);


--
-- Name: skills_vacantes skills_vacantes_id_vacante_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skills_vacantes
    ADD CONSTRAINT skills_vacantes_id_vacante_fkey FOREIGN KEY (id_vacante) REFERENCES public.vacantes(id_vacante);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

